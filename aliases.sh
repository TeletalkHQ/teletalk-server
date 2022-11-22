#! LINUX|MAC USERS ONLY!
#* To use these aliases, you need to manually load this file with "source ./aliases.sh"
#* or run aliasLoader.sh to add it to your current shell configurations,
#* so the aliases can Automatically loaded when opening the shell.

#? Docker aliases
alias docb="docker build . -t stalwart95/teletalk-server"
alias docr="docker run -it -u 0 -p 8080:8080 stalwart95/teletalk-server"

#? Railway aliases
alias rwl="railway logs"
alias rwu="railway up"

#? npm aliases
alias nrb="npm run build"
alias nrsd="npm run start:dev"
alias nrsp="nrb&&npm run start:production"
alias nrspl="nrb&&npm run start:production:local"
alias nrtd="npm run test:dev"
alias nrtp="nrb&&npm run test:production"
alias nrtpl="nrb&&npm run test:production:local"

#? yarn aliases
alias ya="yarn add"
alias yd="yarn dev"
alias ys="yarn start"
alias yy="yarn"
