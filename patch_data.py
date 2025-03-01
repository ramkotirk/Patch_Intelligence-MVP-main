import pandas as pd

# Load CVE and CPE data
cve_file = "cve_data.csv"
cpe_file = "cpe_data.csv"
cve_old_file = "cve_data - cve_data.csv"

cve_df = pd.read_csv(cve_file)
cpe_df = pd.read_csv(cpe_file)
cve_old_df = pd.read_csv(cve_old_file)

# Merge CVE and CPE data on CVE_ID
merged_df = pd.merge(cve_df, cpe_df, on="CVE_ID", how="inner")

# Extract Vendor and Product from CPE
merged_df["Vendor"] = merged_df["CPE"].apply(lambda x: x.split(":")[2] if isinstance(x, str) else "Unknown")
merged_df["Product"] = merged_df["CPE"].apply(lambda x: x.split(":")[3] if isinstance(x, str) else "Unknown")

# Append data from the old CVE file
merged_df = pd.concat([merged_df, cve_old_df], ignore_index=True)

# Keep the version from cve_data.csv
merged_df["Version"] = merged_df["Version"].fillna("Unknown")  # Ensure missing values are handled

# Group by Vendor, Product, and Version, then aggregate CVE_IDs into a comma-separated list
patch_df = merged_df.groupby(['Vendor', 'Product', 'Version'])['CVE_ID'].apply(lambda x: ', '.join(x)).reset_index()

# Rename columns to match patch_data.csv format
patch_df.rename(columns={'CVE_ID': 'Vulnerabilities Fixed'}, inplace=True)

# Save to patch_data.csv
patch_df.to_csv("patch_data.csv", index=False)

print("patch_data.csv has been generated successfully.")
