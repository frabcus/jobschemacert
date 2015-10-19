import json

from flask.ext.cors import CORS
from flask.ext.api import renderers
from flask.ext.api import FlaskAPI
from flask import request

import requests
from bs4 import BeautifulSoup

app = FlaskAPI(__name__)
CORS(app)

class CORSRenderer(renderers.JSONRenderer):
    def render(self, data, media_type, **options):
        options['headers'].append('')
        return super().render(data, media_type, **options)


def validate_jobposting(url):
    content = requests.get(url).content
    soup = BeautifulSoup(content)

    # Look for any of the 3 types of JobPosting markups
    job_posting_found = []
    # Case 1: Microdata
    job_posting_found.append(
        soup.findAll('div', {'itemtype' : 'http://schema.org/JobPosting'})
    )

    # Case 2: RDFa
    job_posting_found.append(
        soup.findAll('div', {
            'vocab' : 'http://schema.org/',
            'typeof': 'JobPosting',
        })
    )

    # Case 3: JSON-LD
    ld_jsons = soup.findAll('script', {
        'type' : 'application/ld+json',
    })
    for ld in ld_jsons:
        ld_json = json.loads(ld)
        job_posting_found.append(ld_json.get("@type", '') == "JobPosting")

    return any(job_posting_found)

@app.route('/example/')
def example():
    import ipdb; ipdb.set_trace()
    return {'request data': request.get}


@app.route('/validate/')
def validate():
    url = request.values['url']
    return {'valid': validate_jobposting(url)}


if __name__ == "__main__":
    app.run(debug=True)
