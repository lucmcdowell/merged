const meetupDataSet = require('../db/meetupdataset');
const questiondetails = require('../db/questiondataset');
const rsvp = require('../db/rsvpdataset');

const meetupCreate = (req, res) => {
  const newMeetup = {
    id: meetupDataSet.length + 1,
    createdOn: Date.now(),
    topic: req.body.topic,
    location: req.body.location,
    happeningOn: req.body.happeningOn,
    images: req.body.images || null,
    tags: req.body.tags || null,
  };
  if (newMeetup.topic && newMeetup.location && newMeetup.happeningOn) {
    meetupDataSet.push(newMeetup);
    return res.status(201).send({
      status: 201,
      data: newMeetup,
    });
  }
  return res.status(400).send({ error: 'Unable to create a meetup' });
};

const getUpcomingMeetups = (req, res) => {
  const upcoming = meetupDataSet.filter(obj => new Date(obj.happeningOn) > new Date(Date.now()));
  if (upcoming.length === 0) {
    return res.status(200).send({
      status: 200,
      message: 'No upcoming meetups found.',
    });
  }
  const sorted = upcoming.sort((a, b) => {
    const aDate = new Date(a.happeningOn);
    const bDate = new Date(b.happeningOn);
    return aDate - bDate;
  });
  return res.status(200).send({ 
    status: 200, 
    data: sorted 
  });
};

const getMeetupById = (req, res) => {
  const find = meetupDataSet.find(x => x.id === parseInt(req.params.id));
  if(!find){
    return res.status(404).send({
    status: 404,
    error: 'No meetup with such id was found',
  });
};
    return res.status(200).send({
      status: 200,
      data: [find],
    });
  
};

const getAllMeetups = (req, res) => {
  if (meetupDataSet.length === 0) {
    return res.status(200).send({
      status: 200,
      message: 'No meetups created yet.',
    });
  } else 
  if (meetupDataSet.length > 0) {
    return res.status(200).send({
      status: 200,
      data: meetupDataSet,
    });
  }
  return res.status(404).send({
    status: 404,
    error: 'Nothing was found',
  });
};

const createQuestion = (req, res) => {
  const find = meetupDataSet.find(x => x.id.toString());
  const newQuestion = {
    askedOn: Date,
    askedBy: 2,
    meetup: find.id,
    title: req.body.title,
    body: req.body.body,
    vote: 0,
  };
  if (newQuestion.title && newQuestion.body) {
    questiondetails.push(newQuestion);
    return res.status(201).send({
      status: 201,
      data: [newQuestion],
    });
  }
};

const upVote = (req, res) => {
  const findquestion = questiondetails.find(x => x.id.toString() === req.params.id);
  if (!findquestion) {
    return res.status(404).send({ status: 404, error: 'Question not found' });
  }
    findquestion.vote += 1;
    return res.status(200).send({
      status: 200,
      data: [
        {
          meetup: findquestion.meetup,
          title: findquestion.title,
          body: findquestion.body,
          votes: findquestion.vote,
        },
      ],
    });
};

const downVote = (req, res) => {
  const findquestion = questiondetails.find(x => x.id.toString() === req.params.id);
  if (!findquestion) {
    return res.status(404).send({ status: 404, error: 'Question not found' });
  }
    findquestion.vote -= 1;
    return res.status(200).send({
      status: 200,
      data: [
        {
          meetup: findquestion.meetup,
          title: findquestion.title,
          body: findquestion.body,
          votes: findquestion.vote,
        },
      ],
    });
};

const rsvps = (req, res) => {
  const { id } = req.params;
  const find = meetupDataSet.find(x => x.id.toString() === id );
  if(!find){
    return res.status(404).send({ status: 404, error: 'Meetup does not exist.' });
  }
  const newRsvp = {
    meetup: find.id,
    topic: find.topic,
  };
  
  const { response } = req.body;
if(find){
if (response === 'yes' || response === 'no' || response === 'maybe') {
  rsvp.push(newRsvp);
  return res.status(201).send({
    status: 201,
    data: [newRsvp],
  });
}
return res.status(400).send({
    status: 400,
    error: 'Wrong response provided. Answer yes, no or maybe',
  });
};
 
};
  
  module.exports = { 
    meetupCreate,getUpcomingMeetups, getMeetupById, getAllMeetups, createQuestion, upVote, downVote, rsvps 
  };