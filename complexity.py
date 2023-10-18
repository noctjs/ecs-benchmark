# find all folders in src/cases/,
# for each folder, aggregate all files and return a summary of how many lines of code exist in each folder.

import os
from pprint import pprint

def count_lines_in_folder(folder_path):
    total_lines = 0
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                with open(file_path, "r") as f:
                    total_lines += len(f.readlines())
    return total_lines

def summarize_lines_of_code_in_folders(root_folder):
    folders = [f.path for f in os.scandir(root_folder) if f.is_dir()]
    summary = {}
    for folder in folders:
        summary[folder.split("\\")[1]] = count_lines_in_folder(folder)
    return summary

root_folder = "src/cases"
summary = summarize_lines_of_code_in_folders(root_folder)
summary_li = [(k, v) for k, v in summary.items()]

pprint(sorted(summary_li, key=lambda x: x[1], reverse=False))
