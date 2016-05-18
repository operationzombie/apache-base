import urllib2, sys
response = urllib2.urlopen(sys.argv[1])

exit(0) #if the response opened correctly, exit
