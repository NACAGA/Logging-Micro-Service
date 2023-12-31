function createLogQueryBuilder(parameters, tableColumns) {
    let query = 'INSERT INTO ServiceEvents (';
    let values = [];
    let queryValues = '(';
    for (const parameter in parameters) {
        if (!tableColumn) query += `${parameter}, `;
        if (!tableColumns.includes(field)) continue;
        query += `${field}, `;
        queryValues += '?, ';
        values.push(fields[field]);
    }
    query = query.slice(0, -2);
    queryValues = queryValues.slice(0, -2) + ')';
    query += ') VALUES ' + queryValues;
    return { query, values };
}

module.exports = { createLogQueryBuilder };
