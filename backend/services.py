from datetime import datetime, timezone
from kmip.pie import client
from kmip import enums
from kmip.pie.client import ProxyKmipClient, enums
import os
from dotenv import load_dotenv, find_dotenv 

dotenv_path = find_dotenv()
load_dotenv(dotenv_path)
certs=os.path.join(os.getcwd(),'certs')

kmip_client = ProxyKmipClient(
    hostname=os.getenv('hostname'),
    port=os.getenv('port'),
    username=os.getenv('username'),
    password=os.getenv('password'),
    cert=os.path.join(certs,'my_signed_client_cert.pem'),
    key=os.path.join(certs,'ca_key.pem'), 
    ca=os.path.join(certs,'ca_cert.pem'), 
    )


# Create a key
def create_kmip_key(key_type, key_length, name):
    with kmip_client:
        uid = kmip_client.create(
            enums.CryptographicAlgorithm[key_type],
            key_length,
            name=name,
            cryptographic_usage_mask=[
                enums.CryptographicUsageMask.ENCRYPT,
                enums.CryptographicUsageMask.DECRYPT
            ]
        )
    return uid

# Fetch a key
def fetch_kmip_key(key_id, attrs=None):
    print(key_id, type(key_id))
    with kmip_client:
        key = kmip_client.get_attributes(key_id, ['Cryptographic Algorithm', 
                                                  'Cryptographic Length', 
                                                  'Cryptographic Usage Mask', 
                                                   'Fresh', 
                                                  'Initial Date', 
                                                  'Last Change Date', 
                                                  'Lease Time', 'Name', 
                                                  'Object Type', 
                                                  'Operation Policy Name', 
                                                  'State', 
                                                  'Unique Identifier'])
        
        clean_response = extract_attributes(key)
        print(clean_response)
    return clean_response

# Edit a key's attributes
def edit_kmip_key(key_id, new_attributes):
    with kmip_client:
        kmip_client.modify(key_id, new_attributes)

# Delete a key
def delete_kmip_key(key_id):
    with kmip_client:
        kmip_client.destroy(key_id)

def extract_attributes(api_response):
    # Extract key ID from the first element of the tuple
    key_id = api_response[0]
    attributes = api_response[1]

    # Initialize a dictionary to store the extracted attribute values
    extracted_values = {"Key ID": key_id}

    # Loop through each attribute in the attributes list
    for attribute in attributes:
        attribute_name = attribute.attribute_name.value

        # Retrieve value based on attribute name
        if attribute_name == 'Cryptographic Algorithm':
            extracted_values['Cryptographic Algorithm'] = attribute.attribute_value.value.name
        elif attribute_name == 'Cryptographic Length':
            extracted_values['Cryptographic Length'] = attribute.attribute_value.value
        elif attribute_name == 'Cryptographic Usage Mask':
            extracted_values['Cryptographic Usage Mask'] = attribute.attribute_value.value
        elif attribute_name == 'Digest':
            extracted_values['Digest'] = {
                'Hashing Algorithm': attribute.attribute_value.hashing_algorithm.value.name,
                'Digest Value': attribute.attribute_value.digest_value.value,
                'Key Format Type': attribute.attribute_value.key_format_type.value.name
            }
        elif attribute_name == 'Fresh':
            extracted_values['Fresh'] = str(attribute.attribute_value.value)
        elif attribute_name == 'Initial Date':
            extracted_values['Initial Date'] = datetime.fromtimestamp(attribute.attribute_value.value, timezone.utc).strftime('%Y-%m-%d' ) 
        elif attribute_name == 'Last Change Date':
            extracted_values['Last Change Date'] = datetime.fromtimestamp(attribute.attribute_value.value, timezone.utc).strftime('%Y-%m-%d' )
        # elif attribute_name == 'Name':
        #     # Adjusted access for the 'Name' attribute
        #     extracted_values['Name'] = attribute.attribute_value.value
        elif attribute_name == 'Object Type':
            extracted_values['Object Type'] = attribute.attribute_value.value.name
        elif attribute_name == 'Operation Policy Name':
            extracted_values['Operation Policy Name'] = attribute.attribute_value.value
        elif attribute_name == 'State':
            extracted_values['State'] = attribute.attribute_value.value.name
        elif attribute_name == 'Unique Identifier':
            extracted_values['Unique Identifier'] = attribute.attribute_value.value

    return extracted_values
# Example usage
if __name__ == '__main__':
    # Create a key
    # new_key_id = create_key()
    # print(f"Created new key with ID: {new_key_id}")

    # Fetch the key
    key = fetch_kmip_key('KEY-086edb0-a726910e-d313-4471-92d9-95b2bc6ebed8')
    print(f"Fetched key: {key}")

    # # Edit the key
    # new_attributes = {
    #     'cryptographic_usage_mask': [
    #         enums.CryptographicUsageMask.ENCRYPT,
    #         enums.CryptographicUsageMask.DECRYPT,
    #         enums.CryptographicUsageMask.SIGN
    #     ]
    # }
    # edit_key(new_key_id, new_attributes)
    # print(f"Edited key {new_key_id}")

    # Delete the key
    # delete_key('KEY-086edb0-f51be238-0f04-483b-b9fe-f17f631bb3f1')
    # print(f"Deleted key 'KEY-086edb0-f51be238-0f04-483b-b9fe-f17f631bb3f1'")