CURRENT_DIR=$(pwd)
COMMAND="source $CURRENT_DIR/aliases.sh"

loader() {
  if [ -f "$1" ]; then
    if grep -q $COMMAND $1; then
      echo "aliases already loaded!"
    else
      echo "\n$COMMAND" >>$1
      echo "aliases loaded successfully"
      zsh
    fi
  fi
}

#* if running bash
if [ -n "$BASH_VERSION" ]; then
  loader "$HOME/.bashrc"
fi

#* if running zsh
if [ -n "$ZSH_VERSION" ]; then
  loader "$HOME/.zshrc"
fi
