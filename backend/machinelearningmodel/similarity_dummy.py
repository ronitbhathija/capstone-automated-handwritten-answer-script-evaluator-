import sys
import torch
from sentence_transformers import SentenceTransformer, models
import re
import openai

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





if __name__ == "__main__":
    sentence1 = sys.argv[1]
    sentence2 = sys.argv[2]


    similarity = predict_similarity(sentence1, sentence2)
    print(similarity)



