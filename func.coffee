class Func 	
	parse : (expression)->
		eva = []
		arr = expression.split("")
		temp = ""
		innerFunc = false
		newArr = [""]
		arr.forEach((v)->
			if(v == "(")
				innerFunc = true
				temp += v
			else if(v is ")")
				innerFunc = false
				temp += v
				add = temp
				if(add.indexOf('x') >= 0)
					newArr.push(add.substring(1, add.length - 1))
				temp = ""
			else if(innerFunc)
				temp += v
		)
		@evaluator = newArr
	evaluate : (input) =>
		v = @expression.replace("x", input)	
		return this.mapVals(input)
	mapVals : (input)->
		v = @evaluator.reduce((total, val, i,i2)->
			a = 1
			if(!total)
				total = 1
			if(val.indexOf("sin") >= 0)
				a = Math.sin(input)
			if(val.indexOf("^") >= 0)
				ex = val.split("^")
				a = Math.pow(input, parseFloat(ex[1]))

			return total*a
		)
	integrate : (upper, lower, n) => 
		interval = upper - lower
		sliceWidth = interval/n
		sliceCount = 0
		area = 0
		while(sliceCount < n)
			area += sliceWidth*this.evaluate(lower + sliceWidth*sliceCount)
			sliceCount++
		return area
	differentiate : (x, distance) ->
		y1 = this.evaluate(x)
		y2 = this.evaluate(x + distance)
		x1 = x
		x2 = x + distance
		return (y2 - y1)/(x2 - x1)
	constructor : (@expression)->
		this.parse(@expression)




obj = new Func("(x^1)(sin x)")
console.log obj.differentiate(1, .0001)



# console.log obj.differentiate(2, .0001)