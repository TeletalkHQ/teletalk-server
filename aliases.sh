#! LINUX|MAC USERS ONLY!
#* To use these aliases, you need to manually load this file with "source ./aliases.sh"
#* or run aliasLoader.sh to add it to your current shell configurations,
#* so the aliases can Automatically loaded when opening the shell.

#? Docker aliases
alias docb="docker build . -t stalwart95/teletalk-server"
alias docr="docker run -it -u 0 -p 8080:8080 stalwart95/teletalk-server"

#? Railway aliases
alias rwu="railway up"
alias rwl="railway logs"

#? npm aliases
alias nrtd="npm run test:dev"
alias nrtp="nrb&&npm run test:production"
alias nrb="npm run build"
alias nrsp="nrb&&npm run start:production"
alias nrsd="npm run start:dev"

#? yarn aliases
alias ya="yarn add"
alias yd="yarn dev"
alias ys="yarn start"
alias yy="yarn"
