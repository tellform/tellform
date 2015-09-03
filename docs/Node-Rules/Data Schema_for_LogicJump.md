Data Schema for LogicJump
-----------------------------

##Initial Structure/Hierarchy

**Each LogicJump has:**
	-"Boolean Statement"
	-Question to Jump to if Boolean Statement is T
	-Question to Jump to if Boolean Statement is F

**Each "Boolean Statement" has:**
	-List of "If.. then.. statements" that are chained with ANDs or ORs

Each "If.. then.. statement" is structured like
	-If.. A condition1 B then...


##What we need to store 
 
	####Constants
		1. List of valid "conditions" (aka boolean comparison operators)
		2. List of valid statement "chainers" (aka AND, OR, NOR, NAND etc)

	####Javascript Mongoose Object
	IfElseStatement = {
		value1: 'true',
		value2: 'false',
		condition: 'isEqual',
	}

	BooleanStatement = {

	}
