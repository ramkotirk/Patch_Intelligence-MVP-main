import pandas as pd

def correlate_data(patch_data, cve_data, cpe_data):
    """
    Correlate patch data with CVEs and CPEs.
    """
    patch_data['CVE_ID'] = patch_data['Vulnerabilities Fixed'].apply(lambda x: x.split(', '))
    correlated_data = []

    for _, row in patch_data.iterrows():
        for cve in row['CVE_ID']:
            if cve in cve_data['CVE_ID'].values:
                correlated_row = {
                    'Vendor': row['Vendor'],
                    'Product': row['Product'],
                    'Version': row['Version'],
                    'CVE_ID': cve,
                    'CPE': cpe_data[cpe_data['CVE_ID'] == cve]['CPE'].values[0]
                }
                correlated_data.append(correlated_row)

    return pd.DataFrame(correlated_data)

# Example Usage
patch_data = pd.read_csv('patch_data.csv')
cve_data = pd.read_csv('cve_data.csv')  # Example CVE data
cpe_data = pd.read_csv('cpe_data.csv')  # Example CPE data
correlated_data = correlate_data(patch_data, cve_data, cpe_data)
correlated_data.to_csv('correlated_data.csv', index=False)
