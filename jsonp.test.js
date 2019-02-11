var jsonp = require('./jsonp')

test('it should inject a script tag to head and set src', () => {
    const head = document.querySelector('head')
    
    expect(head.childElementCount).toBe(0)

    jsonp.get('http://localhost/example/sample-data.js')

    expect(head.childElementCount).toBe(1)

    const scriptTag = head.children[0]
    expect(scriptTag.async).toBe(true)
    expect(scriptTag.src).toBe('http://localhost/example/sample-data.js?callback=callback_jsonp_1')
})
