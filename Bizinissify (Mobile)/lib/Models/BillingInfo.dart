class BillingInfo {
  String _firstName,
      _lastName,
      _phoneNumber,
      _streetAddress,
      _country,
      _city,
      _zipcode;

  BillingInfo(this._firstName, this._lastName, this._phoneNumber,
      this._streetAddress, this._country, this._city, this._zipcode);

  String get firstName => _firstName;

  set name(String value) {
    _firstName = value;
  }

  get lastName => _lastName;

  set lastName(value) {
    _lastName = value;
  }

  get zipcode => _zipcode;

  set zipcode(value) {
    _zipcode = value;
  }

  get city => _city;

  set city(value) {
    _city = value;
  }

  get country => _country;

  set country(value) {
    _country = value;
  }

  get streetAddress => _streetAddress;

  set streetAddress(value) {
    _streetAddress = value;
  }

  get phoneNumber => _phoneNumber;

  set phoneNumber(value) {
    _phoneNumber = value;
  }
}
