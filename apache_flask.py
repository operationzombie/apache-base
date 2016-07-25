#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
	:author: Muneeb Ali | http://muneebali.com
	:license: MIT, see LICENSE for more details.
"""

from flask import Flask, make_response, render_template, jsonify
from flask import request

app = Flask(__name__)

from commontools import log
import serial, time

#-----------------------------------
@app.route('/', methods=['POST', 'GET'])
def index():
	if request.method == 'POST':
		if request.form['submit'] == 'Ping':
			print('\n')
			print '***************** PING MITEN ******************'
			print('\n')
			ser = serial.Serial('COM1')
			ser.write('MITEN')		
		return render_template('index.html')
	elif request.method == 'GET':
		return render_template('index.html')

#-----------------------------------
@app.errorhandler(500)
def internal_error(error):

	reply = []
	return jsonify(reply)

#-----------------------------------
@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( { 'error': 'Not found' } ), 404)
