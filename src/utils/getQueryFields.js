function getQueryFields(info) {
	if (!info) {
		return {};
	}
  
	let fieldNodes = info.fieldNodes;
  
	// get all selectionSets
	const selections = fieldNodes.reduce((selections, source) => {
		if (source.selectionSet) {
			return selections.concat(source.selectionSet.selections);
		}
  
		return selections;
	}, []);
  
	// return fields
	return selections.map((ast) => ast.name.value);
}
  
export default getQueryFields;