import urllib2, sys
try:
  response = urllib2.urlopen(sys.argv[1])
except:
  print "Failed to fetch the specified site: %s" % sys.argv[1]
  exit(1)

exit(0) #if the response opened correctly, exit
