f = open("area.txt", "r")
f2 = open("formattedAreas.js", "w")

remove = False
removeMonsoon = False

f2.write("let areas = {" + "\n")

for line in f:
	line = line.strip()

	#Remove Comments
	line = line.split("#")[0]

	if "color = {" in line: #Remove color uneeded attributes
		continue

	if line == "}":
		line = line + ","

	line = line.replace(" = {", ": [")
	line = line.replace("}", "]")

	if len(line) > 0 and line[0].isdigit():
		line = line.replace(" ", ", ")

	f2.write(line + "\n")


f2.write("}")



f.close();