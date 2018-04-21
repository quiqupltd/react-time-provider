# Contributing

React TimeProvider is open source and contributions are always welcome. In this document we'll cover some dependencies and installation process to get your local development environment up and running.


## Submitting Issues
If you're having trouble please don't hesitate to open Issue [here](https://github.com/QuiqUpLTD/react-time-provider/issues)
Issues are opened with an [Issue Template](https://github.com/QuiqUpLTD/react-time-provider/blob/master/ISSUE_TEMPLATE.md), filling in the fields helps replicate and identify the problem.


### Dependencies
To develop for react-time-provider you'll need:

- [NodeJS](https://nodejs.org)

### Installation

Navigate to the directory you'd like to clone react-time-provider and run:
```
git clone https://github.com/QuiqUpLTD/react-time-provider.git
cd react-time-provider
yarn link
```

The above code will clone the repo, install the required `node_modules` and link the module. Next navigation to your project's directory and run:
```
yarn link "@quiqupltd/react-time-provider"
```

## Notes
Windows users, remember to configure your line endings with `core.autocrlf`. More info [here](https://help.github.com/articles/dealing-with-line-endings/#platform-windows)
```
$ git config --global core.autocrlf true
# Configure Git on Windows to properly handle line endings
```
