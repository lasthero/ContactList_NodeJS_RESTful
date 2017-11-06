'use strict';

function Contact(options) {
    if (!options) {
        options = {};
    }
    
    this.Id = options.Id;
    this.Name = options.Name;
    this.Email = options.Email;
    this.Tel = options.Tel;
}

module.exports = Contact;
