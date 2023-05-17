
// This test fails because 1 !== 2 
xit('Testing to see if Jest works', () => {   
    expect(1).toBe(2) 
})

// This passes because 1 === 1 xit skips test, it runs test
xit('Testing to see if Jest works 2', () => {   
    expect(1).toBe(1) 
})

// test database
test('Jest should use the test DB', ()=> {   
    expect(process.env.DB_DATABASE).toBe('test_db');
})