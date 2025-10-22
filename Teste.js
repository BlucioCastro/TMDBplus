function isValid(s) {
	if (s == "") return true;
	let pilha = [];
	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
			pilha.push(s[i]);
		} else if (pilha[pilha.length-1] === "(" && s[i] === ")") {
		 pilha.pop();
		} else if (pilha[pilha.length-1] === "[" && s[i] === "]") {
		 pilha.pop();
		} else if (pilha[pilha.length-1] === "{" && s[i] === "}") {
		 pilha.pop();
    }else{
      return false
    }
	}
  return pilha.length === 0
}
isValid("()");
isValid("()[]{}");
isValid("(]");
isValid("([])");
isValid("([)]");
