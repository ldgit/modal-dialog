import assert from 'assert';

describe('modal dialog openDialog function', () => {
  it('should create overlay div when called');
  it('should create modal div when called');
  it('should insert given string content into modal div as html');
  it('should remove all its elements from dom when closed');
  it('should return a function that will close opened modal when called');

  describe('behavior when dialog is opened', () => {
    it('should close when close button is clicked');
    it('should close when clicking outside of modal div');
  });
});
