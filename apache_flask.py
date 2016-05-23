#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
	:author: Muneeb Ali | http://muneebali.com
	:license: MIT, see LICENSE for more details.
"""

import time
import serial

from flask import Flask, make_response, render_template, jsonify

ser = serial.Serial(
    port='/dev/ttyUSB1',
    baudrate=9600,
    parity=serial.PARITY_ODD,
    stopbits=serial.STOPBITS_TWO,
    bytesize=serial.SEVENBITS
)
ser.isOpen()




app = Flask(__name__)

from commontools import log

#-----------------------------------
@app.route('/')
def index():
	print 'Enter your commands below.\r\nInsert "exit" to leave the application.'

	input=1
	while 1 :
		# get keyboard input
		input = raw_input(">> ")
		if input == 'exit':
			ser.close()
			exit()
		else:
			# send the character to the device
			# (note that I happend a \r\n carriage return and line feed to the characters - this is requested by my device)
			ser.write(input + '\r\n')
			out = ''
			# let's wait one second before reading output (let's give device time to answer)
			time.sleep(1)
			while ser.inWaiting() > 0:
				out += ser.read(1)

			if out != '':
				print ">>" + out
	return render_template('index.html')
	
#-----------------------------------
@app.route("/", method=("POST",))
def handle_data():
    return "Hello World - you sent me " + str(request.values)

#-----------------------------------
@app.errorhandler(500)
def internal_error(error):

	reply = []
	return jsonify(reply)

#-----------------------------------
@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify( { 'error': 'Not found' } ), 404)
