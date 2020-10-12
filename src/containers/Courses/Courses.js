import React, { Component } from "react";
import Course from './Course/Course'
import Logo from "../../components/Logo/Logo";
import Button from "../../components/UI/Button/Button";
import Search from "../../components/UI/Search/Search";
import classes from "./Courses.module.css";

export class Courses extends Component {
    state = {
        couses: [
            {
                id: "1",
                title: "From Zero to RHCSA",
                cretionDate: "2000-01-03T00:00:00.000Z",
                duration: 15,
                description: "Welcome to From Zero to RHCSA: 10 Weeks to Becoming RHCSA Certified by Sander van Vugt. This is the ultimate training tool for getting Red Hat RHCSA certified. In this 10-week program Sander van Vugt will guide you through a learning journey that builds on the knowledge you gain each week and walk you through key study elements for the exam. This Learning Path includes video lessons, chapter reading, exercises, labs and practice exams.",
                authors: [ "Chop-suey Chinese", "Alfreds Futterkiste"]
            },
            {
                id: "2",
                title: "InnerSource",
                cretionDate: "2012-04-23T00:00:00.000Z",
                duration: 23,
                description: "InnerSource is the application of open source methodologies to internally-developed software. While simple to define, InnerSource can be difficult to explain and implement successfully. Many engineers lack background in open source and the ideas and mechanics of open code development. Even those with that background face a new set of constraints and motivations when trying to work openly within the enterprise. This learning path gives a simple, easy to understand introduction to InnerSource. It introduces key terms, concepts, and principles for effective InnerSource along with explanations and real examples. It is intended to bring newcomers up to speed as well as provide those with experience a common vocabulary to use when discussing more advanced concepts.",
                authors: [ "Ernst Handel", "Chop-suey Chinese", "Maison Dewey"]
            },
            {
                id: "3",
                title: "Red Hat RHCSA 8",
                cretionDate: "2000-10-21T00:00:00.000Z",
                duration: 5,
                description: "The Red Hat Certified System Administrator (RHCSA) Complete"+
                "Video Course, 3rd edition is all new and" +
                "fully updated for RHEL 8. This course is designed to teach you everything you" +
                "need to know to pass the RHCSA exam. Every objective in the exam is discussed," +
                "along with in-depth lessons on complex topics, so they are not confusing. Each" +
                "lesson ends with a lab, so you can dive into your own projects and see Red Hat" +
                "in action; many of these labs mimic scenarios you might find on the exam, so" +
                "you get the experience you need to practice for the exam. These labs also" +
                "include video solutions, so you can also see in real-time how to work through" +
                "the problems and figure out the best methods for working through each scenario.",
                authors: [ 'Alfreds Futterkiste']
            },
            {
                id: "4",
                title: "Introduction to Blockchain Technology",
                cretionDate: "1976-01-04T00:00:00.000Z",
                duration: 60,
                Description: "Blockchain technology is among the most exciting developments in the IT industry in many years. Often shrouded in mystery (including who the person is who developed it), today blockchain is most well known as the technology that underpins cryptocurrencies, the most famous of those being Bitcoin. But blockchain’s distributed-ledger technology holds the promise to revolutionize the way businesses and governments create and maintain important records of transactions of all kinds, whether it’s contracts, deeds, or any other types of activity for which an inviolable record must be maintained.",
                authors: [ "Maison Dewey", "Ernst Handel", "Rancho Grande"]
            }
        ]
      };

  render() {
    return (
      <div className={classes.Courses}>
        <header>
          <Logo height="20%"/>
        </header>
        <nav>
            <div>   
                <Search placeholder="Search by title"/>
                <Button btnType="Regular">Search</Button>
            </div>
            <Button btnType="Regular">Add course</Button>
        </nav>
        <main>
            <div>
                {this.state.couses.map(course => (
                <Course
                    key={course.id}
                    title = {course.title}
                    cretionDate = {course.cretionDate}
                    duration = {course.duration}
                    description = {course.description}
                    authors = {course.authors}
                />
                ))}
            </div>
        </main>
        
      </div>
    );
  }
}

export default Courses;