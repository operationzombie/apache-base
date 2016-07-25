#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
	:author: Muneeb Ali | http://muneebali.com
	:license: MIT, see LICENSE for more details.
"""

from flask import Flask, make_response, render_template, jsonify, request

import serial

app = Flask(__name__)

from commontools import log

#-----------------------------------
@app.route('/', methods=['POST', 'GET'])
def index():    
    if request.method == 'POST':
        if request.form['submit'] == 'Ping':
            print('\n')
            print '***************** PINGING ******************'
            print('\n')
            ser = serial.Serial('COM1')
            ser.write('PING')
            print 'Pinged'
            return render_template('index.html')
        elif request.form['submit'] == 'Pong':
       		print('\n')
        	print '***************** WAITING FOR PONG ******************'
        	print('\n')
      		serRead = serial.Serial('COM2')
        	recievedText = serRead.read(4)
        	print recievedText
        	print '******* PONGED ********'
        	return render_template('index.html')
    	elif request.form['submit'] == 'Ping-Pong':
       		print('\n')
        	print '***************** Ping-Pong ******************'
        	print('\n')
       		ser = serial.Serial('COM1')
       		print 'WRITE PING'
       		ser.write('PING')
        	recievedText = ser.read(4)
        	print recievedText
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
