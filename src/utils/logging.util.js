function createLogQueryBuilder(parameters, tableColumns) {
    let query = 'INSERT INTO ServiceEvents (';
    let values = [];
    let queryValues = '(';
    for (const parameter in parameters) {
        if (!tableColumns.includes(parameter)) continue;
        query += `${parameter}, `;
        queryValues += '?, ';
        values.push(parameters[parameter]);
    }
    query = query.slice(0, -2);
    queryValues = queryValues.slice(0, -2) + ')';
    query += ') VALUES ' + queryValues;
    return { query, values };
}

module.exports = { createLogQueryBuilder };
