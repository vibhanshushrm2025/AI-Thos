import pandas as pd
import os
from sklearn.model_selection import train_test_split
from tqdm import tqdm

def stratified_sample(df, target_column, sample_size=100, random_state=42):
    stratified_df, _ = train_test_split(df, stratify=df[target_column],
                                        train_size=sample_size, random_state=random_state)
    return stratified_df

dirs = [".\\ethics\\deontology", ".\\ethics\\utilitarianism", ".\\ethics\\virtue"]

files_lis = [sorted(os.listdir(dir)) for dir in dirs]

def slice(files_lis):
    for i,files in tqdm(enumerate(files_lis)):
        for file in files:
            df = pd.read_csv(os.path.join(dirs[i], file))
            

# Example usage
df = pd.read_csv("your_dataset.csv")  # Load your dataset
target_column = "your_target_column"  # Replace with your target column name
sliced_df = stratified_sample(df, target_column)

# Save or inspect the sampled dataset
sliced_df.to_csv("stratified_sample.csv", index=False)
print(sliced_df.head())
