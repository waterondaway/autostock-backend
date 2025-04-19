exports.getStockData = (req, res) => {
    const stockData = [
        { id: 1, location: 'A1', brand: 'Toyota', model: 'Camry', partname: 'กันชนหน้าซ้าย', partnumber: '1234', quantity: 2, date_added: '20 APR'},
        { id: 2, location: 'A2', brand: 'Honda', model: 'Civic', partname: 'กันชนหน้าขวา', partnumber: '5678', quantity: 5, date_added: '21 APR'},
        { id: 3, location: 'A3', brand: 'Ford', model: 'Focus', partname: 'กันชนหลังซ้าย', partnumber: '9101', quantity: 3, date_added: '22 APR'},
        { id: 4, location: 'A4', brand: 'Chevrolet', model: 'Malibu', partname: 'กันชนหลังขวา', partnumber: '1121', quantity: 4, date_added: '23 APR'},
        { id: 5, location: 'A5', brand: 'Nissan', model: 'Altima', partname: 'กันชนหน้า', partnumber: '3141', quantity: 6, date_added: '24 APR'},
        { id: 6, location: 'A6', brand: 'Hyundai', model: 'Elantra', partname: 'กันชนหลัง', partnumber: '5161', quantity: 7, date_added: '25 APR'},
        { id: 7, location: 'A7', brand: 'Kia', model: 'Optima', partname: 'กันชนหน้า', partnumber: '7181', quantity: 8, date_added: '26 APR'},
        { id: 8, location: 'A8', brand: 'Subaru', model: 'Impreza', partname: 'กันชนหลัง', partnumber: '9202', quantity: 9, date_added: '27 APR'},
        { id: 9, location: 'A9', brand: 'Mazda', model: '3', partname: 'กันชนหน้า', partnumber: '2232', quantity: 10, date_added: '28 APR'},
        { id: 10, location: 'A10', brand: 'Volkswagen', model: 'Jetta', partname: 'กันชนหลัง', partnumber: '4242', quantity: 11, date_added: '29 APR'}
    ];

    res.json({
        message: 'Stock data retrieved successfully',
        data: stockData
    });
}

exports.getStockDataById = (req, res) => {
    const stockId = parseInt(req.params.id, 10);
    // Simulate stock data retrieval
    const stockData = [
        { id: 1, name: 'AAPL', price: 150 },
        { id: 2, name: 'GOOGL', price: 2800 },
        { id: 3, name: 'AMZN', price: 3400 }
    ];

    const stock = stockData.find(s => s.id === stockId);

    if (stock) {
        res.json({
            message: 'Stock data retrieved successfully',
            data: stock
        });
    } else {
        res.status(404).json({
            message: 'Stock not found'
        });
    }
}