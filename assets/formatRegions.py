f = open("region.txt", "r")
f2 = open("formattedRegions.js", "w")

remove = False
removeMonsoon = False

f2.write("let regions = {" + "\n")

for line in f:
	line = line.strip();
	if line == "areas = {":
		remove = True
		continue

	if line == "monsoon = {":
		removeMonsoon = True
		continue


	if line == "}":
		if remove:
			remove = False
			continue
		elif removeMonsoon:
			removeMonsoon = False
			continue
		line = line + ","

	if removeMonsoon:
		continue


	if line != "" and line != "\n" and line[-1] != "{" and line[-1] != "}" and line[-1] != ",":
		line = '"' + line + '",'
	elif len(line) > 2:
		line = line.replace(" = {", ": [")

	line = line.replace("}", "]")


	f2.write(line + "\n")

f2.write("}")



f.close();