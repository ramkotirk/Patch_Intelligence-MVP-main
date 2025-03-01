import requests

def download_file(url, save_as):
    response = requests.get(url, stream=True)
    if response.status_code == 200:
        with open(save_as, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
        print(f"File downloaded successfully as {save_as}")
    else:
        print("Failed to download file")

url = "https://github.com/CVEProject/cvelistV5/archive/refs/heads/main.zip"
save_as = "cvelistV5-main.zip"
download_file(url, save_as)

import zipfile
zipfile.ZipFile('cvelistV5-main.zip').extractall()

import os
import json
import csv

base_dir = './cvelistV5-main/cves/'
csv_file = 'cve_data - cve_data.csv'

with open(csv_file, mode='w', newline='', encoding='utf-8') as file:
    writer = csv.writer(file)
    writer.writerow(['CVE_ID', 'Product', 'Vendor', 'Version'])

    for year in range(2025, 2026):
        year_dir = os.path.join(base_dir, str(year))

        for subdir in os.listdir(year_dir):
            subdir_path = os.path.join(year_dir, subdir)

            if os.path.isdir(subdir_path):
                for json_file in os.listdir(subdir_path):
                    if json_file.endswith('.json'):
                        json_file_path = os.path.join(subdir_path, json_file)

                        with open(json_file_path, 'r', encoding='utf-8') as json_f:
                            cve_data = json.load(json_f)

                            try:
                                cve_id = cve_data['cveMetadata']['cveId']
                                vendor = cve_data['containers']['cna']['affected'][0]['vendor']
                                product = cve_data['containers']['cna']['affected'][0]['product']
                                version = cve_data['containers']['cna']['affected'][0].get('versions', [{}])[0].get('version', 'N/A')

                                print(cve_id, vendor, product, version)
                                writer.writerow([cve_id, product, vendor, version])
                            except:
                                continue

print(f"CSV file saved to '{csv_file}'")
