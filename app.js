document.addEventListener('DOMContentLoaded', function() {
    const categoryForm = document.getElementById('categoryForm');
    const categoryName = document.getElementById('categoryName');
    const categoryType = document.getElementById('categoryType');
    const categoryAmount = document.getElementById('categoryAmount');
    const categoriesTable = document.getElementById('categoriesTable').querySelector('tbody');

    categoryForm.addEventListener('submit', function(event) {
        event.preventDefault();
		
		if (!categoryName.value || !categoryAmount.value) {
            //alert("Please enter both category name and amount.");
            return;
        }

        // Create new table row for the category
        const row = categoriesTable.insertRow();
        const cellCategory = row.insertCell(0);
        const cellType = row.insertCell(1);
        const cellAmount = row.insertCell(2);
        const cellActions = row.insertCell(3);

        cellCategory.textContent = categoryName.value;
        cellType.textContent = categoryType.value;
        cellAmount.textContent = categoryAmount.value;

        // Add remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'bg-red-500 text-white p-2';
        removeButton.onclick = function() {
            categoriesTable.removeChild(row);
        };
        cellActions.appendChild(removeButton);

        // Clear the input fields
        categoryName.value = '';
        categoryAmount.value = '';
    });

    document.getElementById('submitData').addEventListener('click', function() {
        let syntaxOutput = "";
        const rows = categoriesTable.rows;

        for (let i = 0; i < rows.length; i++) {
            let cells = rows[i].cells;
            let category = cells[0].textContent;
            let type = cells[1].textContent;
            let amount = cells[2].textContent;

            if (type === "income") {
                syntaxOutput += `${category} [${amount}] Budget\n`;
            } else if (type === "expense") {
                syntaxOutput += `Budget [${amount}] ${category}\n`;
            }
        }

        document.getElementById('outputSyntax').textContent = syntaxOutput;
    });
	
	document.getElementById("copyButton").addEventListener("click", function() {
    const text = document.getElementById("outputSyntax").innerText;
    navigator.clipboard.writeText(text).then(() => {
        // You can add some notification to the user here if you want
        console.log('Text copied to clipboard');
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
	});
	
	
});