from kafka import KafkaProducer
import sys
import json
#data = sys.stdin.readlines()
#some_new_listing = data
print('this function was called')
producer = KafkaProducer(bootstrap_servers='kafka:9092')
#some_new_listing = {'title': 'Used MacbookAir 20"', 'description': 'This is a used Macbook Air in great condition', 'id':52}
some_new_listing = sys.argv[1]; 
producer.send('new-listings-topic', json.dumps(some_new_listing).encode('utf-8'))