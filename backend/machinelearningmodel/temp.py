
import os
import re
import openai
from google.cloud import vision_v1
from google.cloud.vision_v1 import ImageAnnotatorClient
from sympy import Eq, symbols, solve
import unicodedata

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


# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'at.json'
# client = vision_v1.ImageAnnotatorClient()
# IMAGE_FILE = r'eq3.jpg'

# with open(IMAGE_FILE, 'rb') as image_file:
#     content = image_file.read()

# image = vision_v1.Image(content=content)
# response = client.text_detection(image=image)
# docText = response.text_annotations[0].description
# cleaned_text = re.sub(r'\s+', ' ', docText).strip()
# print(cleaned_text)
cleaned_text="на D) H2 O + H2O-2H20 ан ан → 2) сни+202 → со2 + 2H2O 3) 2H2+O2 → 24 20"
# print(cleaned_text)
api_key = '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'

prompt = f"Please correct the chemical equations in the following text and number the equations in a new line accordingly::\n{cleaned_text}\nImproved Text:"

openai.api_key = api_key
response = openai.Completion.create(
    engine="text-davinci-003",
    prompt=prompt,
    max_tokens=100,
    temperature=0.7,
)
improved_text = response.choices[0].text.strip()
print(improved_text)
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

print(valid_equations)

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
# for question_number, data in student_data.items():
#     print(f"Question {question_number}:")
#     print("Reactants:", data['Reactants'])
#     print("Products:", data['Products'])


correct_reactants=[]
correct_products=[]
keyequationarrayofarray = [
  [ "1", "H2O + H2O -> 2H2O", "5" ],
  [ "2", "CH4 + 2O2 -> CO2 + 2H2O", "5" ],
  [ "3", "2H2 + O2 -> 2H2O", "5" ]
]
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
# for question_number, data in equation_data.items():
#     print(f"Question {question_number}:")
#     print("Reactants:", data['Reactants'])
#     print("Products:", data['Products'])

# First, process and print the dictionaries from image text
print('student DATA')
for key, value in student_data.items():
    print(f"{key}: {value}")
print('equation data')
for key, value in equation_data.items():
    print(f"{key}: {value}")

# Calculate and print similarity for the first set of dictionaries
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

# Print the Jaccard similarities for the first set of dictionaries
# for key, value in overall_similarities.items():
#     print(f"{key}: {value}")

total_marks = sum(overall_similarities.values())
print(f"Total Marks: {total_marks}")