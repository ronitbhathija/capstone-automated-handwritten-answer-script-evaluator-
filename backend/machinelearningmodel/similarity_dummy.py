import sys
import torch
from sentence_transformers import SentenceTransformer, models
import openai
import os
import re
import openai
from google.cloud import vision_v1
from google.cloud.vision_v1 import ImageAnnotatorClient
from sympy import Eq, symbols, solve
import unicodedata

# Define the model architecture
word_embedding_model = models.Transformer('bert-base-uncased', max_seq_length=128)
pooling_model = models.Pooling(word_embedding_model.get_word_embedding_dimension())
sts_bert_model = SentenceTransformer(modules=[word_embedding_model, pooling_model])

# Load the saved model state_dict
model_state_dict = torch.load('C://webtechnologies//capstone//newbranch//capstone-automated-handwritten-answer-script-evaluator-//backend//machinelearningmodel//sts_bert_model.pth')

# Remove the "sts_model" prefix from the keys in the state_dict
new_state_dict = {}
for key, value in model_state_dict.items():
    new_key = key.replace("sts_model.", "")
    new_state_dict[new_key] = value

# Set the model to evaluation mode
sts_bert_model.eval()

# Load the modified state_dict
sts_bert_model.load_state_dict(new_state_dict)

# Define a function to make predictions
def predict_similarity(text1, text2):
    # Encode the input texts and compute sentence embeddings
    embeddings = sts_bert_model.encode([text1, text2], convert_to_tensor=True)

    # Compute the cosine similarity
    similarity_score = torch.nn.functional.cosine_similarity(embeddings[0], embeddings[1], dim=0).item()

    return similarity_score


def calculate_scores_answers(question_array_1, question_dict_2):
    answer_scores = {}

    for question_num, answer, max_marks in question_array_1:
        if question_num in question_dict_2:
            text2 = question_dict_2[question_num]
            similarity_score = predict_similarity(answer, text2)
            
            # Apply scoring rules based on similarity_score
            if 0.01 <= similarity_score <= 0.1:
                adjusted_marks = 0.1
            elif 0.11 <= similarity_score <= 0.2:
                adjusted_marks = 0.2
            elif 0.21 <= similarity_score <= 0.3:
                adjusted_marks = 0.3
            elif 0.31 <= similarity_score <= 0.4:
                adjusted_marks = 0.4
            elif 0.41 <= similarity_score <= 0.5:
                adjusted_marks = 0.5
            elif 0.51 <= similarity_score <= 0.6:
                adjusted_marks = 0.6
            elif 0.61 <= similarity_score <= 0.7:
                adjusted_marks = 0.7
            elif 0.71 <= similarity_score <= 0.8:
                adjusted_marks = 0.8
            elif 0.81 <= similarity_score <= 0.9:
                adjusted_marks = 0.9
            elif similarity_score <= 0:
                adjusted_marks = 0.0
            else:
                adjusted_marks = 1.0  # Full marks

            if question_num in answer_scores:
                answer_scores[question_num] += (float(max_marks) * adjusted_marks)
            else:
                answer_scores[question_num] = (float(max_marks) * adjusted_marks)

            print(f"Question {question_num}: Max Marks = {max_marks}, Similarity Score = {similarity_score}, final score = {answer_scores[question_num]}")

    return answer_scores


def convert_subscripts_to_normal(script):
    converted_script = ""
    for char in script:
        if char.isdigit():
            subscript_value = unicodedata.numeric(char)
            converted_script += str(int(subscript_value))
        elif char == '→':
            converted_script += '->'
        else:
            converted_script += char

    return converted_script

def calculate_jaccard_similarity(array1, array2):
    set1 = set(array1)
    set2 = set(array2)
    intersection = len(set1.intersection(set2))
    union = len(set1) + len(set2) - intersection
    similarity = intersection / union
    return similarity

if __name__ == "__main__":
    studentanswer = sys.argv[1]
    data_string1 = sys.argv[2]
    data_string2 = sys.argv[3]


    keyanswerarrayofarray = [row.split('\t') for row in data_string1.split('\n') if row]
    keyequationarrayofarray = [row.split('\t') for row in data_string2.split('\n') if row]

    # //answer part
    n = len(keyanswerarrayofarray)

    if keyequationarrayofarray == []:
        api_key = ''
        openai.api_key = api_key
        prompt = f"Correct the OCR text and output the answers. Make sure each answer is numbered. Take the answer number from the input. Ex- 1. answer 6. answer\n{studentanswer}\nCorrected Text:"

        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=200,  # Adjust max tokens as needed to accommodate the script length
            temperature=0.2,
        )

        improved_script = response.choices[0].text.strip()
        carray=[]
        corrected_answers = improved_script.split('\n')
        stud_ans_dict={}
        for ans in corrected_answers:
                stud_ans_dict[ans[0]]=ans[3:]


        # print(stud_ans_dict)
        answer_scores = calculate_scores_answers(keyanswerarrayofarray, stud_ans_dict)
            
        total_marks = sum(answer_scores.values())
        # print(round(total_marks))

        print(f"Total Marks: {total_marks}")

    else:
        api_key = ''

        prompt = f"Please correct the chemical equations in the following text and number the equations in a new line accordingly::\n{studentanswer}\nImproved Text:"

        openai.api_key = api_key
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
            temperature=0.7,
        )
        improved_text = response.choices[0].text.strip()
        # print(improved_text)
        equation_pattern = r'\b\d?[A-Za-z0-9]+(?:\s*\+\s*\d?[A-Za-z0-9]+)*\s*→\s*\d?[A-Za-z0-9]+(?:\s*\+\s*\d?[A-Za-z0-9]+)*\b'
        equations_list = improved_text.split('\n')
        valid_equations = []
        for equation in equations_list:
            parts = equation.split(') ')
            if len(parts) == 2:
                question_number = int(parts[0])
                equation_text = parts[1]
                equation_match = re.search(equation_pattern, equation_text)
                if equation_match:
                    valid_equation = equation_match.group()
                    valid_equation=convert_subscripts_to_normal(valid_equation)
                    valid_equations.append([question_number, valid_equation])

        # print(valid_equations)

        reactants=[]
        products=[]
        # keyequationarrayofarray = [['1', 'H2O + H2O -> 2H2O', '1'], ['1', 'CH4 + 2O2 -> CO2 + 2H2O', '1'], ['2', '2H2 + O2 -> 2H2O', '1']]
        student_data = {}
        for item in valid_equations:
            question_number = item[0]
            equation = item[1]
            sides = equation.split("->")
            reactant_side = sides[0].strip()
            product_side = sides[1].strip()
            reactants = [r.strip() for r in reactant_side.split("+")]
            products = [p.strip() for p in product_side.split("+")]
            if question_number in student_data:
                student_data[question_number]['Reactants'].extend(reactants)
                student_data[question_number]['Products'].extend(products)
            else:
                student_data[question_number] = {
                    'Reactants': reactants,
                    'Products': products
                }


        correct_reactants=[]
        correct_products=[]
        # keyequationarrayofarray = [  [ '1', 'H2O + H2O -> 2H2O', '5' ],
        # [ '2', 'CH4 + 2O2 -> CO2 + 2H2O', '5' ],
        # [ '3', '2H2 + O2 -> 2H2O', '5' ]]
        equation_data = {}
        for item in keyequationarrayofarray:
            question_number = int(item[0])
            equation = item[1]
            sides = equation.split("->")
            reactant_side = sides[0].strip()
            product_side = sides[1].strip()
            reactants = [r.strip() for r in reactant_side.split("+")]
            products = [p.strip() for p in product_side.split("+")]
            if question_number in equation_data:
                equation_data[question_number]['Reactants'].extend(reactants)
                equation_data[question_number]['Products'].extend(products)
            else:
                equation_data[question_number] = {
                    'Reactants': reactants,
                    'Products': products
                }
        overall_similarities = {}
        for question_number in student_data.keys():
            if question_number in equation_data:
                correct_reactants = equation_data[question_number]['Reactants']
                correct_products = equation_data[question_number]['Products']

                student_reactants = student_data[question_number]['Reactants']
                student_products = student_data[question_number]['Products']

                reactants_similarity = calculate_jaccard_similarity(correct_reactants, student_reactants)
                products_similarity = calculate_jaccard_similarity(correct_products, student_products)

                overall_similarity = (reactants_similarity + products_similarity) / 2

                max_marks = int([item[2] for item in keyequationarrayofarray if int(item[0]) == question_number][0])

                # Store the product of similarity and max marks in overall_similarities
                overall_similarities[question_number] = overall_similarity * max_marks
                print(f"Question {question_number}: Max Marks = {max_marks}, Similarity Score = {overall_similarity}, Adjusted Marks = {overall_similarities[question_number]}")


        total_marks = sum(overall_similarities.values())
        print(f"Total Marks: {total_marks}")