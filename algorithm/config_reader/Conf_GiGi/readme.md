Description for configuration file
==================================

Character set: `utf8`</br>
A standard configuration file consists of following 3 aspects:</br>

* **Note**:begin with `#` in each line</br>
* **Item**:</br>
	* consist of key and value linked by `=` without space</br>
	* `=` must not exist in key and value</br>
	* key must not begin with `#`</br>

For instance:</br>

---

\#This is a note of following item.</br>
\#This is also a note of following item.</br>
KEY=value</br>

---

* **Leave blank lines between two different items**</br>
For instance:</br>

---

\#This is a note of following item.</br>
\#This is also a note of following item.<br>
KEY1=value1</br>

\#This is a note of following item.</br>
\#This is also a note of following item.</br>
KEY2=value2</br>

---

