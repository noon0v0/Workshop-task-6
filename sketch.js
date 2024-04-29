let user_input;
let user_line;
let button;

let poem = [];

function setup() {
  createCanvas(400, 400);
  user_input = createInput();
  user_input.position(40, 100);
  button = createButton("add to poem");
  button.position(user_input.x, user_input.y + 21);
  button.mousePressed(new_line);
}

function draw() {
  background(220);
  write_poem();
}

function write_poem() {
  for(x = 0; x < poem.length; x++){
    text(poem[x], 40, 180 + x * 30);
  }
}

function new_line() {
  user_line = user_input.value();
  user_input.value('');

  let words = RiTa.tokenize(user_line);
  let num = int(random(3));
  switch(num) {
    case 0:
      let r = floor(random(0, words.length));
      let rhymes = RiTa.rhymesSync(words[r]);
      if(rhymes.length === 0){
        poem.push(user_line);
      }else{
        let changeWord = random(rhymes);
        words[r] = changeWord;
        user_line = RiTa.untokenize(words)
        poem.push(user_line);
      }
      break;
    case 1:
      let new_words = []
      for(x = 0; x < words.length; x++){
        let analysis = RiTa.analyze(words[x]);
        let pos = analysis.pos;
        if (pos == 'nn' || pos == 'nns') {
          let similar_word = RiTa.soundsLike(words[x]);
          if (similar_word.length > 0){
            new_words.push(random(similar_word));
          }else{
            new_words.push(words[x]);
          }
        }
      }
      user_line = RiTa.untokenize(new_words)
      poem.push(user_line);
      break;
    case 2:
      let random_words = [];
      for(x = 0; x < words.length; x++){
        random_words.push(RiTa.randomWord());
      }
      user_line = RiTa.untokenize(random_words)
      poem.push(user_line);
      break;
  }
  
}