##  ModuGraph IDE 
## Version: 0.0.1
## Status: alpha
--------------------------------------------

Created by: Dr. Kyle Goslin, Dr. Markus Hofmann

Institute of Technology Blanchardstown

---------------------------------------------
## What is ModuGraph IDE?

ModuGraph IDE is a browser based visual editor for creating D3.js graphs.
The concept behind this project is to remove the need for programming knowledge
allowing anyone to create graphs based on any file content.

ModuGraph contains a number of different building blocks or "operators" that are
used to build up a chain of different actions to be performed. Each different
operator is only responsible for one task, so multiple operators are needed to get
from start to finish.

An example of how ModuGraph can be used is to visualize text in a D3.js based graph.
If we break the graphing process down into smaller steps we can see how the operators
can be applied, e.g.,
 
1. read from a file, (TXT Reader operator)
2. extract the content, (TXT Reader operator)
3. remove non alphanumeric characters (Strip Operator)
4. converting the data to a JSON based format for the graph (Convert Operator)
5. and finally passing the data to the graphing tool. (Graph Operator)



When building a graph, often we want to perform different operators on the data during the
graph generation process. ModuGraph allows you to create a chain of operators that can easily
modified to change what data is kept or removed and how the final graph is created.

---------------------------------------------
## Under the Hood

After a chain of operators have been completed, ModuGraph then validate the chain in the web browser
to ensure all of the operators are in the correct order and linking together. After this has been completed,
a Python based text processing engine is used to generate the desired graph. 

Technologies ModuGraph is build on:
* JavaScript/jQuery/HTML for the user interface
* NodeJS for server side development with the Express framework
* Python 3 for low level data manipulation with Python NLTK
* D3.js for graphig



