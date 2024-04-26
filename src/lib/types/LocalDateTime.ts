import {
  LocalDateTime as BaseLocalDateTime,
  convert,
  nativeJs,
} from '@js-joda/core';

export default class LocalDateTime {
  static native = (date: Date) =>
    new LocalDateTime(nativeJs(date).toLocalDateTime());

  static of = (date: BaseLocalDateTime) => new LocalDateTime(date);

  static now = () => new LocalDateTime(BaseLocalDateTime.now());

  constructor(private readonly date: BaseLocalDateTime) {}

  toNative = () => convert(this.date).toDate();

  year = () => this.date.year();
  month = () => this.date.monthValue();
  dayOfMonth = () => this.date.dayOfMonth();
}
