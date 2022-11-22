CURRENT_DIR=$(pwd)
COMMAND="source $CURRENT_DIR/aliases.sh"

loader() {
  RC_PATH="$HOME/.$1rc"

  if [ -f "$RC_PATH" ]; then
    if grep -q -x $COMMAND $RC_PATH; then
      echo "aliases already loaded!"
    else
      echo "$COMMAND" >>$RC_PATH
      echo "aliases loaded successfully"
      exec $1
    fi
  fi
}

#* if running bash
if [ -n "$BASH_VERSION" ]; then
  loader "bash"
fi

#* if running zsh
if [ -n "$ZSH_VERSION" ]; then
  loader "zsh"
fi
