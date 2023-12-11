#! LINUX|MAC USERS ONLY. I haven't tested it on Mac, so use with caution

#* To use these aliases, you need to manually load this file with "source ./aliases.sh"
#* or run loader.sh to add it to your current shell configurations,
#* so the aliases can Automatically loaded when opening the shell.

#* How to run loader.sh? E.g. bash ./loader.sh

#? Docker
alias docb="docker build . -t stalwart95/teletalk-server"
alias docr="docker run -it -u 0 -p 8080:8080 stalwart95/teletalk-server"
alias doccu="docker compose up --build"

#? Railway
alias rwl="railway logs"
alias rwu="railway up"

#? Liara
alias lrdd="liara deploy --platform=docker"
alias lrdn="liara deploy --platform=node"
alias lrl="liara logs"

#? npm
alias nrb="npm run build"
alias nrcf="npm run check:format"
alias nrcl="npm run check:lint"
alias nrcs="npm run check:style"
alias nrct="npm run check:types"
alias nrctw="npm run check:types:watch"
alias nrsd="npm run start:dev"
alias nrsp="npm run start:production"
alias nrspl="npm run start:production:local"
alias nrspr="npm run start:production:railway"
alias nrtc="npm run test:coverage"
alias nrtd="npm run test:dev"

#? yarn
alias ya="yarn add"
alias yd="yarn dev"
alias ys="yarn start"
alias yy="yarn"
