export const logins = [
    {
        status: 'Available',
        type: 'Checkings',
        balance: 45,
        price: 5,
        country: 'USA',
        bank: {
            name: 'Chase',
            country: 'USA'
        },
        createdAt: '07-06-2020',
        updatedAt: '02-10-2020',
        _id: 1,
        includes: ['Logins', 'Email Access', 'Phone Number']
    },
    {
        status: 'Available',
        type: 'Savings',
        balance: 450,
        price: 10,
        country: 'UK',
        bank: {
            name: 'Barclays',
            country: 'UK'
        },
        createdAt: '05-07-2020',
        updatedAt: '01-08-2020',
        _id: 2,
        includes: ['Logins', 'Security Q & A ', 'Swift/Iban code']
    }
];
