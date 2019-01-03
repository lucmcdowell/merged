const empty_details = {
    topic: '',
    location: '',
    happeningOn: '',
  };
  
  const invalid_inputs = {
    topic: '#$abc#',
    location: '@x$c%',
    happeningOn: '',
    images: ['http://exampleurl.com/image1', 'http://exampleurl.com/image2.jpg'],
    tags: ['tag1', 'tag2&'],
  };
  
  const correct_details = {
    createdOn: "Date.now()",
    topic: "Andela Learning Community 2.0",
    location: "University of Rwanda / College of Science and Technology",
    happeningOn: "10/22/2019",
    images: "sample1.png",
    Tags: ["Andela', 'ALC', 'Learning"],
  };

  const correct_details2 = {
    createdOn: Date.now(),
    topic: "Andela Learning Community 2.0",
    location: "University of Rwanda / College of Science and Technology",
    happeningOn: "10/22/2019",
    images: "sample1.png",
    Tags: ["Andela', 'ALC', 'Learning"],
  };

  
  const correct_optional_inputs = {
    topic: 'topic 001',
    location: 'location 001',
    happeningOn: '2019-12-08T23:02',
  };

  module.exports = {
    empty_details, invalid_inputs, correct_details,
    correct_details2, correct_optional_inputs,
  };