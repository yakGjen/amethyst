class Test {
  constructor(name) {
    this.name = name;
  }

  echo() {
    console.log(this.name);
  }
}

const a = new Test('Bla');
a.echo();