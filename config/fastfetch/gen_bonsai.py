import subprocess
from pathlib import Path

body    = '\033[38;2;46;74;46m'      # dark green - godzilla body
spine   = '\033[38;2;0;232;200m'     # radioactive cyan - spines W V
mid     = '\033[38;2;80;160;80m'     # mid green - M
vsub    = '\033[38;2;0;180;155m'     # softer cyan - v (lowercase)
eye     = '\033[38;2;255;220;0m'     # glowing yellow - eyes O
build   = '\033[38;2;90;90;110m'     # concrete grey - buildings #
roofline= '\033[38;2;110;110;130m'   # lighter grey - building lines | -
special = '\033[38;2;255;110;0m'     # orange - P
dim     = '\033[38;2;55;55;65m'      # very dim - separator line
reset   = '\033[0m'

godzilla = r"""                _,-}}-._
               /\   }  /\
             _|(O\\_ _/O)                  ___|_
            _|/  (__''__)                 |#####|
          _|\/    WVVVVW                  |#####|
         \ _\     \MMMM/_             .-----.###|
       _|\_\     _ '---; \_           |#####|###|
  /\   \ _\/      \_   /   \          |#####|###|
 / (    _\/     \   \  |'VVV     P    |#####|###|
(  '-,._\_.(      'VVV /      (_/|\_) |#####|###|
 \         /   _) /   _)     (_/_ _\_)|#####|###|
  '....--''\__vvv)\__vvv)_____|_| |_|_|#####|###|_____ ldb
------------------------------------------------"""

def char_color(ch, line):
    if ch == ' ':       return None
    if ch == 'O':       return eye
    if ch in 'WV':      return spine
    if ch == 'v':       return vsub
    if ch == 'M':       return mid
    if ch == '#':       return build
    if ch in '|-' and '#' in line: return roofline
    if ch == 'P':       return special
    return body

def colorize(line):
    is_sep = line.strip().replace('-', '') == ''
    if is_sep:
        return f'{dim}{line}{reset}'
    result = []
    cur = None
    for ch in line:
        c = char_color(ch, line)
        if c is None:
            if cur: result.append(reset); cur = None
            result.append(ch)
        else:
            if c != cur:
                if cur: result.append(reset)
                result.append(c); cur = c
            result.append(ch)
    if cur: result.append(reset)
    return ''.join(result)

lines = [colorize(l) for l in godzilla.split('\n')]

# small amirah below
amirah_raw = subprocess.check_output(['figlet', '-f', 'small', 'amirah']).decode().rstrip('\n')
amirah_color = '\033[38;2;0;232;200m'  # same radioactive cyan as spines
for line in amirah_raw.split('\n'):
    lines.append(f'{amirah_color}{line}{reset}')

ascii_path = Path.home() / '.config' / 'fastfetch' / 'ascii.txt'
ascii_path.parent.mkdir(parents=True, exist_ok=True)
ascii_path.write_text('\n'.join(lines) + '\n')

raw = godzilla.split('\n')
print(f'done — {len(raw)} lines, width: {max(len(l) for l in raw)}')
