# Hugo Module

Include the Hugo module into your project by adding it to the config.yaml. 
```
module:
  imports:
  - path: 'github.com/lukogex/tech-radar-hugo'
```

Install the latest versions of all module dependencies.
`hugo mod get -u`
Install javascript dependencies.
```
hugo mod npm pack
npm install
```

Follow the description in the [usage section](#usage) to add items to the tech radar.

# Tech radar

## About

The Radar is a document that sets out the changes that are currently interesting regarding software development.  
You can find more information about it [here](https://www.thoughtworks.com/radar/faq).

![tech-radar](static/images/preview.png)

### Categories

- Languages-Frameworks
- Platforms
- Techniques
- Tools

### Rings

- Adopt
  We have capacity to use these solutions, they have already been deployed in production.
  First choices to start a new project.
- Can Use
  Pertinence of those solutions have been demonstrated.
  You can use it on your project but you need to provide a reason to not use the default choice.
- Assess
  These solutions may bring values.
  It is necessary to assess and test them in our environment to confirm or not this vision.
- Deprecated
  For various reasons, these solutions are no longer the first choices or are not recommended (anymore).

### Source Code

The javascript source code of the radar has been copied initially from [here](https://github.com/agilepartner/tech-radar-js).

## License

Even when the CC licenses do not require a copy of the license I've added one from [here](https://github.com/idleberg/Creative-Commons-Markdown/releases/tag/v0.4.1) to make it visible in the same manner as for other licenses.

This project is based on the work of [Yoan Thirion](https://www.linkedin.com/in/yoanthirion/) [here](https://github.com/ythirion/tech-radar-hugo).

## Usage

The tech radar is built based on the elements specified in the content folder.

To add new content to the radar:
* **Create a new md file** under the desired category folder in the `content` folder
    * languages-frameworks
    * platforms
    * techniques
    * tools
* **Add meta data to the file** in the front matter (in yaml format)
```yaml
---
name: [name of the concept]
image: [relative image url]
category: [Languages-Frameworks or Platforms or Techniques or Tools]
ring: [Adopt or Can Use or Assess or Deprecated]
type: tech-radar
layout: details
---
```
* **Add details to the file**
    * `What is it ?` : Describe the concept / technology
    * `Why ?` : Explain why is it useful and when
    * `For who ?` : Make a list of roles that could be positively impacted by this technology (ex: Product Owner, Developers, ...)
    * `Resources` : Useful resources on this technology
    * `Contacts` : Make a list of teams or people using the technology (people that could help on the topic in the near future)

### File Example

A file could look like this:
```
---
name: Golang
image: /images/tech-radar/golang.png
category: Languages-Frameworks
ring: Can Use
type: tech-radar
layout: details
---

# What is It?

Go is an open source programming language designed for building scalable, secure and reliable software.

# Why?

Especially for Kubernetes workloads we need an alternative to the heavy weighted JVM applications.
Go fits very good here with better performance and its far lower sartup times and memory consumption.
Even compared to Java native compiled images Go has advantages due to its simplicity, especially in regards of package manegement and CI jobs.

# For Whom?

Mainly used for backend microservices.
Especially for adapter services which are used to decouple other systems.

# Resources

- https://go.dev/
- https://gobyexample.com/

# Contacts

- [Lukas Kranabetter](mailto:me@lukogex.net)
```
