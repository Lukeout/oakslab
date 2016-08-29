from kafka import KafkaConsumer
import json
import time
from elasticsearch import Elasticsearch

time.sleep(10)

consumer = KafkaConsumer('new-listings-topic', group_id='listing-indexer', bootstrap_servers=['kafka:9092'])
es = Elasticsearch(['es'])

while True:
	for message in consumer:
		print(message)
		new_listing = json.loads((message.value).decode('utf-8'))
		es.index(index='listing_index', doc_type='listing', id=new_listing['id'], body=new_listing)
		es.indices.refresh(index="listing_index")