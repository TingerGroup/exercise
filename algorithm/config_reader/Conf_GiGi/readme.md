A standard configuration file consists of following 2 aspects:

1.Note:begin with '#' in each line
2.Item:
	(1)consist of key and value linked by '=' without space
	(2)the '=' must not exist in key and value
	(3)key must not begin with '#'


For instance:</br>

------------------------------------------------------
#This is a note of following item.</br>
#This is also a note of following item.</br>
KEY=value</br>
------------------------------------------------------

Leave blank lines between two different items,for instance:</br>

------------------------------------------------------
#This is a note of following item.</br>
#This is also a note of following item.<br>
KEY1=value1

#This is a note of following item.</br>
#This is also a note of following item.</br>
KEY2=value2</br>
------------------------------------------------------
