#!/usr/bin/python3
# -*- coding: utf-8 -*-

# import libraries
import sys
import re
import json
import urllib2
# import BaseHTTPServer
# import CGIHTTPServer
from bs4 import BeautifulSoup

reload(sys)
sys.setdefaultencoding("utf-8")
i = 0
a = 1
micromania = []

while a < 6:
    # specify the url
    quote_page = 'https://www.au-magasin.fr/enseigne/19-micromania' + '/' + str(a)
    print quote_page
    # query the website and return the html to the variable 'page'
    page = urllib2.urlopen(quote_page)

    # parse the html using beautiful soup and store in variable 'soup'
    soup = BeautifulSoup(page, 'html.parser')

    # Take out the <div> of name and get its value

    name_box = soup.find('a', attrs={'class': 'item-title'})

    # Get name

    for el in soup.find_all("a", class_="item-title"):
        store = {}
        script_text = el.get_text()
        store['id'] = 0
        store['name'] = script_text
        store['address'] =  ''
        store['lat'] = ''
        store['lng'] =  ''
        micromania.append(store)

    #Get address
    for el in soup.find_all("p", class_="desc"):
        store = {}
        script_text = el.get_text()
        newstr = script_text.replace("\n", "")
        address = newstr.rsplit('Numéro', 1)[0]
        add = address.strip()
        mag = micromania[i]
        mag['address'] = add
        mag['id'] = i
        i = i + 1
    a = a + 1

# Fetching coordonnate

url_start = 'https://maps.googleapis.com/maps/api/geocode/json?address='

j = 0
while j < len(micromania) :
    mag = micromania[j]
    address = mag['address']

    #Format adresse to fetch coordonate

    step1 = re.search('(\d{5}?)', address).groups()
    step2 = ''.join(step1) + ','
    step3= re.sub(r'(\d{5}?)', step2, address)
    address2 = step3.replace(' -', ',')
    address_final = address2.replace(' ', '+')
    final_url = url_start + address_final
    response = urllib2.urlopen(final_url)
    resp = json.loads(response.read())
    print final_url


    #Because don't have a google key
    print resp['status']
    if resp['status'] != 'OK':
        while resp['status'] != 'OK':
            response = urllib2.urlopen(final_url)
            resp = json.loads(response.read())
            print resp['status']

    coordonate = resp['results'][0]['geometry']['location']   
    data = micromania[j]
    data['lat'] = coordonate['lat']
    data['lng'] = coordonate['lng']
    j += 1



#Create data json file
with open('data.json', 'w') as f:
    f.write(json.dumps(micromania, indent=4))
