ROOT_DIR=$(pwd)
COMMAND="source $ROOT_DIR/scripts/alias/aliases.sh"

loader() {
  CONFIG_PATH="$HOME/.$1rc"

  if [ -f "$CONFIG_PATH" ]; then
    if grep -q -x "$COMMAND" "$CONFIG_PATH"; then
      echo "aliases already loaded for $1!"
    else
      echo "$COMMAND" >>$CONFIG_PATH
      echo "aliases loaded successfully"
    fi
  fi
}

if [ -f "$HOME/.bashrc" ]; then
  loader "bash"
fi

if [ -f "$HOME/.zshrc" ]; then
  loader "zsh"
fi

exec "$SHELL"
