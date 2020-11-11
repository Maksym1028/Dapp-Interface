
export function logger(...args: Array<any>) {
  try {
    console.groupCollapsed(
      `%c ${JSON.stringify(args)}`,
      'color:#379683; font-size: 1.2; font-weight: bold',
    );
    console.trace();
    console.groupEnd();
  } catch (error) {
    console.log(
      `%c ${args}`,
      'color:blue; font-size: 1.2; font-weight: bold',
    );
  }
}
