import sys
import re
from random import randint
from nltk import ngrams

'''

Main engine class that contains all of the
different operators that are available.
'''
class Engine:
    contents = 'nan'
    workingFile = ''
    
    def readTXTFile(self):
        print ("Read TXT File")
        
        
        with open(workingFile) as f:
            for line in f.readlines():
                self.contents += line

    def stripNonAlpha(self):
        print ("stripping non alpha")
        # strip everything but spaecs
        self.contents = re.sub(r'([^\s\w\.]|_)+', '', self.contents)
        
        
    def makeNGram(self):
        print ("making n grams")
        n = 2
        content = ''
        sixgrams = ngrams(self.contents.split(), n)
        for grams in sixgrams:
          print (grams)
          content += str(grams)          
        self.contents = content
        
        
    # just a basic function for printing
    # the contents of the buffer
    # to the user    
    def showContents(self):
        
        print(self.contents)
        
    def loadConfigFile(self, configFilePath):
        print("loading config file")
        
        f = open(configFilePath, 'r')
        # first line of the config file is the file
        # the user wants to open.
        global workingFile
        workingFile = f.readline()
        
        print("user target file is:"+workingFile)
        f.close()
        
        
e = Engine()
# Contains a list of different flags to run on the engine

# these flags are separated by colons. e.g., python.exe rt:sna:sc ../user/config.cfg       
runOrder = sys.argv[1]

# This parmeter points to where the configuration file is stored.
configFile = sys.argv[2]
print("Config file is: " + configFile)
e.loadConfigFile(configFile)

# run through all of the flags that have been entered
# and run the corrector process for each
# this assumes the flags are in the correct order.
for operator in runOrder.split(":"):
    if "rt" in operator:
        e.readTXTFile()
    elif "sna" in operator:
        e.stripNonAlpha()
    elif "ng" in operator:
        e.makeNGram();
    elif "sc" in operator:
        e.showContents()    
        
